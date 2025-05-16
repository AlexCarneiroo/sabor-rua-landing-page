
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Certifique-se que Textarea está importado
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription as ShadcnCardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

// Atualizado para incluir URLs de redes sociais
export const contactFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres.").max(50, "O título não pode ter mais de 50 caracteres."),
  highlightedWord: z.string().max(30, "A palavra destacada não pode ter mais de 30 caracteres.").optional(),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres.").max(300, "A descrição não pode ter mais de 300 caracteres."),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres.").max(100, "O endereço não pode ter mais de 100 caracteres."),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/, "Formato de telefone inválido. Use (XX) XXXXX-XXXX ou apenas números.").or(z.literal("")),
  email: z.string().email("Formato de email inválido.").max(50, "O email não pode ter mais de 50 caracteres."),
  scheduleWeekdays: z.string().min(5, "O horário deve ter pelo menos 5 caracteres.").max(50, "O horário não pode ter mais de 50 caracteres."),
  scheduleWeekends: z.string().min(5, "O horário deve ter pelo menos 5 caracteres.").max(50, "O horário não pode ter mais de 50 caracteres."),
  facebookUrl: z.string().url({ message: "Por favor, insira uma URL válida para o Facebook." }).optional().or(z.literal('')),
  instagramUrl: z.string().url({ message: "Por favor, insira uma URL válida para o Instagram." }).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const defaultContactValues: ContactFormValues = {
  title: "Entre em Contato",
  highlightedWord: "Conosco",
  description: "Estamos sempre prontos para ouvir você. Seja para dúvidas, sugestões ou apenas um olá, use os canais abaixo ou venha nos visitar!",
  address: "Rua Fictícia, 123, Bairro Imaginário, Cidade Exemplo - CE",
  phone: "(00) 12345-6789",
  email: "contato@saboresdarua.com.br",
  scheduleWeekdays: "10:00 - 22:00",
  scheduleWeekends: "12:00 - 23:00",
  facebookUrl: "https://facebook.com/saboresdarua",
  instagramUrl: "https://instagram.com/saboresdarua",
};

const ContactManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultContactValues,
    mode: "onChange",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "content", "contact");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          form.reset(docSnap.data() as ContactFormValues);
        } else {
          await setDoc(docRef, defaultContactValues); // Cria o documento com valores padrão se não existir
          form.reset(defaultContactValues);
          toast.info("Valores padrão para Contato foram configurados.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados de Contato:", error);
        toast.error("Erro ao carregar dados de Contato.");
        form.reset(defaultContactValues);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactData();
  }, [form]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "content", "contact");
      await setDoc(docRef, data, { merge: true });
      toast.success('Dados da seção de Contato salvos com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar dados de Contato:", error);
      toast.error('Erro ao salvar dados de Contato.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Seção de Contato</CardTitle>
        <ShadcnCardDescription>Edite as informações que aparecem na seção "Entre em Contato" do seu site.</ShadcnCardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título Principal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Entre em Contato" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="highlightedWord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Palavra Destacada no Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Conosco" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>Esta palavra será destacada com a cor da marca.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição Curta</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Uma breve descrição para a seção de contato..." {...field} rows={3} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Rua das Palmeiras, 123, Centro, Cidade - UF" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone de Contato</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: (00) 91234-5678" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de Contato</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: contato@seuemail.com" {...field} type="email" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="scheduleWeekdays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário (Seg - Sex)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 08:00 - 18:00" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scheduleWeekends"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário (Sáb - Dom)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 09:00 - 14:00 (ou Fechado)" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do Facebook (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: https://facebook.com/seunegocio" {...field} type="url" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do Instagram (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: https://instagram.com/seunegocio" {...field} type="url" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-brand-DEFAULT hover:bg-brand-dark text-white" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Informações de Contato"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactManager;
