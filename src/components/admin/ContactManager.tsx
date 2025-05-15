
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

const contactFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres." }).max(100, { message: "O título não pode ter mais de 100 caracteres." }),
  highlightedWord: z.string().min(1, { message: "A palavra destacada deve ser informada." }).max(30, { message: "A palavra destacada não pode ter mais de 30 caracteres." }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres." }).max(200, { message: "A descrição não pode ter mais de 200 caracteres." }),
  address: z.string().min(5, { message: "O endereço deve ter pelo menos 5 caracteres." }).max(200, { message: "O endereço não pode ter mais de 200 caracteres." }),
  phone: z.string().min(8, { message: "O telefone deve ter pelo menos 8 caracteres." }).max(20, { message: "O telefone não pode ter mais de 20 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  scheduleWeekdays: z.string().min(3, { message: "O horário deve ter pelo menos 3 caracteres." }).max(50, { message: "O horário não pode ter mais de 50 caracteres." }),
  scheduleWeekends: z.string().min(3, { message: "O horário deve ter pelo menos 3 caracteres." }).max(50, { message: "O horário não pode ter mais de 50 caracteres." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const defaultContactValues: ContactFormValues = {
  title: "Entre em",
  highlightedWord: "Contato",
  description: "Tem alguma dúvida, sugestão ou quer fazer uma reserva? Fale conosco!",
  address: "Rua Fictícia das Delícias, 123\nBairro Saboroso, Cidade Exemplo - CE",
  phone: "(85) 91234-5678",
  email: "contato@sabordarua.com.br",
  scheduleWeekdays: "11:00 - 23:00",
  scheduleWeekends: "12:00 - 00:00"
};

const ContactManager = () => {
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
        const contactDocRef = doc(db, "content", "contact");
        const docSnap = await getDoc(contactDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as ContactFormValues;
          form.reset(data);
        } else {
          form.reset(defaultContactValues);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da seção Contato:", error);
        toast.error("Erro ao carregar dados da seção Contato.");
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
      const contactDocRef = doc(db, "content", "contact");
      await setDoc(contactDocRef, data);
      toast.success('Dados da seção Contato salvos com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar dados da seção Contato:", error);
      toast.error('Erro ao salvar dados da seção Contato.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Seção Contato</CardTitle>
        <CardDescription>Altere as informações da seção "Entre em Contato" do seu site.</CardDescription>
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
                        <Input placeholder="Entre em" {...field} disabled={isLoading} />
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
                        <Input placeholder="Contato" {...field} disabled={isLoading} />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Tem alguma dúvida, sugestão ou quer fazer uma reserva? Fale conosco!" {...field} disabled={isLoading} />
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
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua Fictícia das Delícias, 123" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Insira o endereço completo do estabelecimento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(85) 91234-5678" {...field} disabled={isLoading} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contato@sabordarua.com.br" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduleWeekdays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de Funcionamento (Dias de Semana)</FormLabel>
                  <FormControl>
                    <Input placeholder="11:00 - 23:00" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Formato sugerido: HH:MM - HH:MM
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduleWeekends"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de Funcionamento (Fins de Semana)</FormLabel>
                  <FormControl>
                    <Input placeholder="12:00 - 00:00" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Formato sugerido: HH:MM - HH:MM
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-brand-DEFAULT hover:bg-brand-dark text-white" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações da Seção Contato"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactManager;
