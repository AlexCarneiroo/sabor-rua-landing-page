
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'sonner';
import { Progress } from "@/components/ui/progress";

const aboutFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres." }).max(100, { message: "O título não pode ter mais de 100 caracteres." }),
  highlightedWord: z.string().min(1, { message: "A palavra destacada deve ser informada." }).max(30, { message: "A palavra destacada não pode ter mais de 30 caracteres." }),
  paragraph1: z.string().min(10, { message: "O primeiro parágrafo deve ter pelo menos 10 caracteres." }).max(300, { message: "O primeiro parágrafo não pode ter mais de 300 caracteres." }),
  paragraph2: z.string().min(10, { message: "O segundo parágrafo deve ter pelo menos 10 caracteres." }).max(300, { message: "O segundo parágrafo não pode ter mais de 300 caracteres." }),
  buttonText: z.string().min(3, { message: "O texto do botão deve ter pelo menos 3 caracteres." }).max(30, { message: "O texto do botão não pode ter mais de 30 caracteres." }),
  buttonLink: z.string().min(1, { message: "O link do botão deve ser informado." }),
  imageUrl: z.string().url({ message: "Por favor, insira uma URL de imagem válida." }).optional().or(z.literal('')),
});

export type AboutFormValues = z.infer<typeof aboutFormSchema>;

export const defaultAboutValues: AboutFormValues = {
  title: "Nossa História, Seu",
  highlightedWord: "Sabor",
  paragraph1: "No Sabor da Rua, acreditamos que comida de verdade tem o poder de conectar pessoas e criar memórias. Nascemos da paixão pela culinária de rua autêntica, trazendo pratos clássicos e inovações deliciosas para sua mesa.",
  paragraph2: "Utilizamos ingredientes frescos, selecionados com carinho, e preparamos cada prato com a dedicação que você merece. Seja para um delivery rápido ou uma reserva especial, estamos prontos para te servir o melhor do sabor da rua.",
  buttonText: "Conheça Nosso Cardápio",
  buttonLink: "#menu",
  imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
};

const AboutManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(defaultAboutValues.imageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: defaultAboutValues,
    mode: "onChange",
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      setIsLoading(true);
      try {
        const aboutDocRef = doc(db, "content", "about");
        const docSnap = await getDoc(aboutDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as AboutFormValues;
          form.reset(data);
          setCurrentImageUrl(data.imageUrl);
        } else {
          form.reset(defaultAboutValues);
          setCurrentImageUrl(defaultAboutValues.imageUrl);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da seção Sobre:", error);
        toast.error("Erro ao carregar dados da seção Sobre.");
        form.reset(defaultAboutValues);
        setCurrentImageUrl(defaultAboutValues.imageUrl);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutData();
  }, [form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      // Preview da imagem selecionada
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("imageUrl", "", { shouldValidate: true }); // Limpa URL antiga, pois vamos usar a nova
    }
  };

  const onSubmit = async (data: AboutFormValues) => {
    setIsLoading(true);
    setUploadProgress(null);
    let finalData = { ...data };

    if (selectedFile) {
      const storageRef = ref(storage, `aboutImages/${selectedFile.name}-${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Erro no upload da imagem:", error);
            toast.error('Erro ao fazer upload da imagem.');
            setIsLoading(false);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              finalData.imageUrl = downloadURL;
              setCurrentImageUrl(downloadURL);
              setSelectedFile(null);
              resolve();
            } catch (error) {
              console.error("Erro ao obter URL de download:", error);
              toast.error('Erro ao obter URL da imagem.');
              setIsLoading(false);
              reject(error);
            }
          }
        );
      });
    }

    try {
      const aboutDocRef = doc(db, "content", "about");
      await setDoc(aboutDocRef, finalData);
      toast.success('Dados da seção Sobre salvos com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar dados da seção Sobre:", error);
      toast.error('Erro ao salvar dados da seção Sobre.');
    } finally {
      setIsLoading(false);
      setUploadProgress(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Seção Sobre</CardTitle>
        <CardDescription>Altere o conteúdo da seção "Sobre Nós" do seu site.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título Principal</FormLabel>
                      <FormControl>
                        <Input placeholder="Nossa História, Seu" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormDescription>
                        Parte inicial do título (antes da palavra destacada)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="highlightedWord"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Palavra Destacada</FormLabel>
                      <FormControl>
                        <Input placeholder="Sabor" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormDescription>
                        Palavra que será destacada no título
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="paragraph1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primeiro Parágrafo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Conte a história do seu estabelecimento..."
                      rows={4}
                      {...field} 
                      disabled={isLoading} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paragraph2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo Parágrafo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Fale mais sobre seus diferenciais..."
                      rows={4}
                      {...field} 
                      disabled={isLoading} 
                    />
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
                  <FormLabel>Texto do Botão</FormLabel>
                  <FormControl>
                    <Input placeholder="Conheça Nosso Cardápio" {...field} disabled={isLoading} />
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
                  <FormLabel>Link do Botão</FormLabel>
                  <FormControl>
                    <Input placeholder="#menu" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Use # para links internos (exemplo: #menu) ou URL completa para links externos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Imagem</FormLabel>
              {currentImageUrl && !selectedFile && (
                <img 
                  src={currentImageUrl} 
                  alt="Imagem atual da seção Sobre" 
                  className="mt-2 mb-2 rounded-md max-h-48 object-cover" 
                />
              )}
              {selectedFile && currentImageUrl && (
                <img 
                  src={currentImageUrl} 
                  alt="Preview da nova imagem" 
                  className="mt-2 mb-2 rounded-md max-h-48 object-cover" 
                />
              )}
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand-DEFAULT hover:file:bg-brand-DEFAULT/80"
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Faça upload de uma nova imagem ou cole uma URL abaixo.
              </FormDescription>
            </FormItem>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ou URL da Imagem</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="https://exemplo.com/imagem.jpg" 
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

            <Button type="submit" className="bg-brand-DEFAULT hover:bg-brand-dark text-white" disabled={isLoading}>
              {isLoading ? (uploadProgress !== null ? `Enviando... ${uploadProgress.toFixed(0)}%` : "Salvando...") : "Salvar Alterações da Seção Sobre"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AboutManager;
