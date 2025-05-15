
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const heroFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres." }).max(100, { message: "O título não pode ter mais de 100 caracteres." }),
  subtitle: z.string().min(10, { message: "O subtítulo deve ter pelo menos 10 caracteres." }).max(200, { message: "O subtítulo não pode ter mais de 200 caracteres." }),
  buttonText: z.string().min(3, { message: "O texto do botão deve ter pelo menos 3 caracteres." }).max(30, { message: "O texto do botão não pode ter mais de 30 caracteres." }),
  buttonLink: z.string().url({ message: "Por favor, insira uma URL válida." }),
  backgroundImageUrl: z.string().url({ message: "Por favor, insira uma URL de imagem válida." }).optional().or(z.literal('')),
});

type HeroFormValues = z.infer<typeof heroFormSchema>;

// Valores padrão para o formulário (eventualmente virão do Firebase)
const defaultValues: Partial<HeroFormValues> = {
  title: "O Verdadeiro Sabor da Rua...",
  subtitle: "Descubra pratos autênticos...",
  buttonText: "Peça Agora Online",
  buttonLink: "#menu", // Link de exemplo
  backgroundImageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
};

const HeroManager = () => {
  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: HeroFormValues) => {
    console.log('Dados do formulário da Seção Hero:', data);
    // Aqui, futuramente, enviaremos os dados para o Firebase
    // Ex: await updateHeroData(data);
    alert('Dados da Seção Hero enviados para o console! (Integração com Firebase pendente)');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Seção Hero</CardTitle>
        <CardDescription>Altere os textos, link do botão e imagem de fundo da seção principal.</CardDescription>
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
                    <Input placeholder="Ex: O Melhor Sabor da Cidade" {...field} />
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
                    <Input placeholder="Ex: Pratos deliciosos feitos com carinho" {...field} />
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
                    <Input placeholder="Ex: Ver Cardápio" {...field} />
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
                    <Input type="url" placeholder="Ex: https://seu.site/cardapio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="backgroundImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem de Fundo</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Ex: https://images.unsplash.com/..." {...field} />
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
