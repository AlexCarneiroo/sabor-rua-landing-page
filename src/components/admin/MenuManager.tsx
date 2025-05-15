
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { toast } from 'sonner';
import DishForm, { DishFormValues } from './DishForm'; // Importar o formulário
import { PlusCircle, Trash2, Edit } from 'lucide-react'; // Ícones

// Estender DishFormValues para incluir um ID opcional do Firestore
export interface Dish extends DishFormValues {
  id: string;
}

const MenuManager = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const dishesColRef = collection(db, "featuredDishes");
    const unsubscribe = onSnapshot(dishesColRef, (snapshot) => {
      const fetchedDishes = snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({
        id: docSnap.id,
        ...(docSnap.data() as DishFormValues),
      }));
      setDishes(fetchedDishes);
      setIsLoading(false);
    }, (error) => {
      console.error("Erro ao buscar pratos:", error);
      toast.error("Erro ao carregar pratos.");
      setIsLoading(false);
    });
    return () => unsubscribe(); // Limpar listener ao desmontar
  }, []);

  const handleAddDish = async (data: DishFormValues) => {
    setIsLoading(true);
    try {
      const dishesColRef = collection(db, "featuredDishes");
      await addDoc(dishesColRef, data);
      toast.success("Prato adicionado com sucesso!");
      setShowForm(false); // Fechar formulário
    } catch (error) {
      console.error("Erro ao adicionar prato:", error);
      toast.error("Erro ao adicionar prato.");
    }
    setIsLoading(false);
  };

  const handleUpdateDish = async (data: DishFormValues) => {
    if (!editingDish) return;
    setIsLoading(true);
    try {
      const dishDocRef = doc(db, "featuredDishes", editingDish.id);
      await updateDoc(dishDocRef, data);
      toast.success("Prato atualizado com sucesso!");
      setShowForm(false);
      setEditingDish(null);
    } catch (error) {
      console.error("Erro ao atualizar prato:", error);
      toast.error("Erro ao atualizar prato.");
    }
    setIsLoading(false);
  };
  
  const handleDeleteDish = async (dishId: string) => {
    if (!confirm("Tem certeza que deseja excluir este prato?")) return;
    setIsLoading(true);
    try {
      const dishDocRef = doc(db, "featuredDishes", dishId);
      await deleteDoc(dishDocRef);
      toast.success("Prato excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir prato:", error);
      toast.error("Erro ao excluir prato.");
    }
    setIsLoading(false);
  };

  const openAddForm = () => {
    setEditingDish(null);
    setShowForm(true);
  };

  const openEditForm = (dish: Dish) => {
    setEditingDish(dish);
    setShowForm(true);
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gerenciar Cardápio (Destaques)</CardTitle>
            <CardDescription>Adicione, edite ou remova pratos da seção de destaques.</CardDescription>
          </div>
          {!showForm && (
            <Button onClick={openAddForm} className="bg-green-500 hover:bg-green-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Prato
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {showForm ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">{editingDish ? 'Editar Prato' : 'Adicionar Novo Prato'}</h3>
            <DishForm 
              onSubmit={editingDish ? handleUpdateDish : handleAddDish} 
              defaultValues={editingDish ? editingDish : undefined}
              isEditing={!!editingDish}
              isLoading={isLoading}
            />
            <Button variant="outline" onClick={() => { setShowForm(false); setEditingDish(null); }} className="mt-4">
              Cancelar
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {isLoading && dishes.length === 0 && <p>Carregando pratos...</p>}
            {!isLoading && dishes.length === 0 && <p>Nenhum prato em destaque cadastrado.</p>}
            {dishes.map((dish) => (
              <div key={dish.id} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  <img src={dish.imageSrc} alt={dish.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h4 className="font-semibold">{dish.name}</h4>
                    <p className="text-sm text-muted-foreground">{dish.price}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEditForm(dish)}>
                    <Edit className="mr-1 h-4 w-4" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteDish(dish.id)} disabled={isLoading}>
                    <Trash2 className="mr-1 h-4 w-4" /> Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuManager;
