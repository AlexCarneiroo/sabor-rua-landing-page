import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription as ShadcnCardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'sonner';
import { Progress } from "@/components/ui/progress";

const heroFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres." }).max(100, { message: "O título não pode ter mais de 100 caracteres." }),
  subtitle: z.string().min(10, { message: "O subtítulo deve ter pelo menos 10 caracteres." }).max(200, { message: "O subtítulo não pode ter mais de 200 caracteres." }),
  buttonText: z.string().min(3, { message: "O texto do botão deve ter pelo menos 3 caracteres." }).max(30, { message: "O texto do botão não pode ter mais de 30 caracteres." }),
  buttonLink: z.string().url({ message: "Por favor, insira uma URL válida." }),
  backgroundImageUrl: z.string().url({ message: "Por favor, insira uma URL de imagem válida." }).optional().or(z.literal('')),
});

export type HeroFormValues = z.infer<typeof heroFormSchema>;

export const defaultValues: HeroFormValues = {
  title: "O Verdadeiro Sabor Único da Cidade", // Título genérico
  subtitle: "Descubra pratos autênticos e deliciosos, preparados com os melhores ingredientes e muito carinho para você.",
  buttonText: "Peça Agora Online",
  buttonLink: "#menu",
  backgroundImageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
};

const HeroManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [currentBackgroundImageUrl, setCurrentBackgroundImageUrl] = useState<string | undefined>(defaultValues.backgroundImageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      setIsLoading(true);
      try {
        const heroDocRef = doc(db, "content", "hero");
        const docSnap = await getDoc(heroDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as HeroFormValues;
          form.reset(data);
          setCurrentBackgroundImageUrl(data.backgroundImageUrl);
        } else {
          form.reset(defaultValues);
          setCurrentBackgroundImageUrl(defaultValues.backgroundImageUrl);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da Hero Section:", error);
        toast.error("Erro ao carregar dados da Seção Hero.");
        form.reset(defaultValues);
        setCurrentBackgroundImageUrl(defaultValues.backgroundImageUrl);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, [form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("HeroManager: File selected:", file.name, file.type, file.size); // Log Adicionado
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentBackgroundImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("backgroundImageUrl", "", { shouldValidate: true });
    } else {
      console.log("HeroManager: File selection cancelled or no file."); // Log Adicionado
    }
  };

  const onSubmit = async (data: HeroFormValues) => {
    console.log("HeroManager: onSubmit triggered with data:", data); // Log Adicionado
    console.log("HeroManager: selectedFile is:", selectedFile ? selectedFile.name : null); // Log Adicionado
    setIsLoading(true);
    setUploadProgress(null);
    let finalData = { ...data };

    if (selectedFile) {
      const storageRef = ref(storage, `heroImages/${selectedFile.name}-${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("HeroManager: Upload task error:", error); // Log Adicionado
            toast.error('Erro ao fazer upload da imagem de fundo.');
            setIsLoading(false);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              finalData.backgroundImageUrl = downloadURL;
              setCurrentBackgroundImageUrl(downloadURL); 
              setSelectedFile(null); 
              resolve();
            } catch (error) {
              console.error("HeroManager: Get download URL error:", error); // Log Adicionado
              toast.error('Erro ao obter URL da imagem de fundo.');
              setIsLoading(false);
              reject(error);
            }
          }
        );
      });
    } else if (data.backgroundImageUrl === "" && currentBackgroundImageUrl !== defaultValues.backgroundImageUrl && !selectedFile) {
      // Se o campo URL está vazio e não é o default, e nenhum novo arquivo foi selecionado,
      // significa que o usuário quer remover a imagem ou usar o padrão
       // Neste caso, podemos manter a URL atual se ela existir, ou limpar se o usuário apagou a URL
      // A lógica aqui pode ser refinada, por exemplo, para reverter para uma imagem padrão.
      // Se a URL foi apagada no campo e não há novo upload, assumimos que quer limpar.
      // Se o campo foi apagado e currentBackgroundImageUrl era uma URL válida, mantemos.
      // Se o campo foi apagado e currentBackgroundImageUrl era o default, então fica vazio (ou o default se for a lógica).
      // Por simplicidade, se data.backgroundImageUrl for "" e não houver selectedFile,
      // e a URL atual não for a default, mantemos a atual. Se o usuário explicitamente apagou o campo de texto e
      // não subir nova imagem, ele espera que a imagem seja removida ou revertida ao default.
      // Se o campo está vazio, e nenhum arquivo foi selecionado, e o currentImageUrl não é o default,
      // o usuário pode ter apagado a URL manualmente.
      // Se backgroundImageUrl está vazio, mas currentBackgroundImageUrl tem valor (e não é o file preview),
      // e nenhum selectedFile existe, então mantemos o currentBackgroundImageUrl.
      // Se o usuário explicitamente limpou o campo URL e não selecionou novo arquivo,
      // o backgroundImageURL será salvo como "".
      // A form.setValue no handleFileChange para "" garante que se um novo arquivo for selecionado, a URL antiga é desconsiderada.
      // Se não houver selectedFile, o valor de backgroundImageUrl do form (data) será usado.
    }


    // Se não houve upload (selectedFile é null), e finalData.backgroundImageUrl está vazio,
    // mas currentBackgroundImageUrl (que pode ser de um load anterior) existe,
    // então usamos o currentBackgroundImageUrl, a menos que o usuário tenha explicitamente apagado o campo de texto.
    // O schema já valida se a URL é válida ou uma string vazia.
    // O `form.reset` no useEffect já lida com o carregamento inicial.
    // Se o campo URL foi apagado manualmente, `data.backgroundImageUrl` será `""`.
    if (!selectedFile && data.backgroundImageUrl === "" && currentBackgroundImageUrl !== defaultValues.backgroundImageUrl) {
      // Isso significa que o usuário apagou o campo URL mas não selecionou um novo arquivo.
      // Se quiser permitir remover a imagem, `finalData.backgroundImageUrl` já será `""`.
      // Se quiser reverter para o default ao apagar, faria aqui:
      // finalData.backgroundImageUrl = defaultValues.backgroundImageUrl;
    }


    try {
      const heroDocRef = doc(db, "content", "hero");
      await setDoc(heroDocRef, finalData);
      toast.success('Dados da Seção Hero salvos com sucesso!');
    } catch (error) {
      console.error("HeroManager: Firestore setDoc error:", error); // Log Adicionado
      toast.error('Erro ao salvar dados da Seção Hero.');
    } finally {
      setIsLoading(false);
      setUploadProgress(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Seção Hero</CardTitle>
        <ShadcnCardDescription>Altere os textos, link do botão e imagem de fundo da seção principal.</ShadcnCardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: O Melhor Sabor da Cidade" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Pratos deliciosos feitos com carinho" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto do Botão Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Ver Cardápio" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="buttonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do Botão Principal</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Ex: https://seu.site/cardapio" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Imagem de Fundo</FormLabel>
              {currentBackgroundImageUrl && !selectedFile && (
                <img src={currentBackgroundImageUrl} alt="Preview da imagem de fundo atual" className="mt-2 mb-2 rounded-md max-h-48 w-auto" />
              )}
              {selectedFile && currentBackgroundImageUrl && ( 
                 <img src={currentBackgroundImageUrl} alt="Preview da nova imagem de fundo" className="mt-2 mb-2 rounded-md max-h-48 w-auto" />
              )}
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Faça upload de uma nova imagem ou cole uma URL abaixo. Se ambos forem fornecidos, o upload terá prioridade.
              </FormDescription>
              <FormMessage />
            </FormItem>
             <FormField
              control={form.control}
              name="backgroundImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ou URL da Imagem de Fundo (será substituída pelo upload, se houver)</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="Ex: https://images.unsplash.com/..." 
                      {...field} 
                      value={field.value || ""} 
                      disabled={isLoading || !!selectedFile} 
                    />
                  </FormControl>
                  <FormDescription>
                    Cole a URL da imagem aqui. Se uma imagem for carregada acima, esta URL será ignorada.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {uploadProgress !== null && (
              <Progress value={uploadProgress} className="w-full" />
            )}
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? (uploadProgress !== null ? `Enviando... ${uploadProgress.toFixed(0)}%` : "Salvando...") : "Salvar Alterações da Seção Hero"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HeroManager;
