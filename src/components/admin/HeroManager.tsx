import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from '@/lib/firebase'; // Importar db
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Importar funções do Firestore
import { toast } from 'sonner'; // Importar toast

const heroFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres." }).max(100, { message: "O título não pode ter mais de 100 caracteres." }),
  subtitle: z.string().min(10, { message: "O subtítulo deve ter pelo menos 10 caracteres." }).max(200, { message: "O subtítulo não pode ter mais de 200 caracteres." }),
  buttonText: z.string().min(3, { message: "O texto do botão deve ter pelo menos 3 caracteres." }).max(30, { message: "O texto do botão não pode ter mais de 30 caracteres." }),
  buttonLink: z.string().url({ message: "Por favor, insira uma URL válida." }),
  backgroundImageUrl: z.string().url({ message: "Por favor, insira uma URL de imagem válida." }).optional().or(z.literal('')),
});

export type HeroFormValues = z.infer<typeof heroFormSchema>;

// Valores padrão caso não haja nada no Firebase
export const defaultValues: HeroFormValues = {
  title: "O Verdadeiro Sabor da Rua...",
  subtitle: "Descubra pratos autênticos...",
  buttonText: "Peça Agora Online",
  buttonLink: "#menu",
  backgroundImageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
};

const HeroManager = () => {
  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const heroDocRef = doc(db, "content", "hero");
        const docSnap = await getDoc(heroDocRef);
        if (docSnap.exists()) {
          form.reset(docSnap.data() as HeroFormValues);
          console.log("Dados da Hero Section carregados do Firebase:", docSnap.data());
        } else {
          console.log("Nenhum dado da Hero Section encontrado no Firebase, usando valores padrão.");
          form.reset(defaultValues); // Garante que os valores padrão sejam usados se não houver dados
        }
      } catch (error) {
        console.error("Erro ao buscar dados da Hero Section:", error);
        toast.error("Erro ao carregar dados da Seção Hero.");
        form.reset(defaultValues); // Garante que os valores padrão sejam usados em caso de erro
      }
    };
    fetchHeroData();
  }, [form]);

  const onSubmit = async (data: HeroFormValues) => {
    try {
      const heroDocRef = doc(db, "content", "hero");
      await setDoc(heroDocRef, data);
      toast.success('Dados da Seção Hero salvos com sucesso!');
      console.log('Dados da Seção Hero salvos no Firebase:', data);
    } catch (error) {
      console.error("Erro ao salvar dados da Hero Section:", error);
      toast.error('Erro ao salvar dados da Seção Hero.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Seção Hero</CardTitle>
        <CardDescription>Altere os textos, link do botão e imagem de fundo da seção principal. Os dados são salvos automaticamente no Firebase.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ...FormField para title (manter como está) ... */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: O Melhor Sabor da Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ...FormField para subtitle (manter como está) ... */}
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Pratos deliciosos feitos com carinho" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ...FormField para buttonText (manter como está) ... */}
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto do Botão Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Ver Cardápio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ...FormField para buttonLink (manter como está) ... */}
             <FormField
              control={form.control}
              name="buttonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do Botão Principal</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Ex: https://seu.site/cardapio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ...FormField para backgroundImageUrl (manter como está) ... */}
            <FormField
              control={form.control}
              name="backgroundImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem de Fundo</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Ex: https://images.unsplash.com/..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-brand-DEFAULT hover:bg-brand-dark text-white">
              Salvar Alterações da Seção Hero
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HeroManager;
