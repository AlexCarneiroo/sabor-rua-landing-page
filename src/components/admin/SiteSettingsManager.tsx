
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

const siteSettingsFormSchema = z.object({
  establishmentName: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }).max(50, { message: "O nome não pode ter mais de 50 caracteres." }),
});

type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>;

const defaultSiteSettings: SiteSettingsFormValues = {
  establishmentName: "Sabor da Rua",
};

const SiteSettingsManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsFormSchema),
    defaultValues: defaultSiteSettings,
    mode: "onChange",
  });

  useEffect(() => {
    const fetchSiteSettings = async () => {
      setIsLoading(true);
      try {
        const settingsDocRef = doc(db, "content", "siteSettings");
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          form.reset(docSnap.data() as SiteSettingsFormValues);
        } else {
          form.reset(defaultSiteSettings); // Se não existir, usa o padrão
        }
      } catch (error) {
        console.error("Erro ao buscar configurações do site:", error);
        toast.error("Erro ao carregar configurações do site.");
        form.reset(defaultSiteSettings);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSiteSettings();
  }, [form]);

  const onSubmit = async (data: SiteSettingsFormValues) => {
    setIsLoading(true);
    try {
      const settingsDocRef = doc(db, "content", "siteSettings");
      await setDoc(settingsDocRef, data);
      toast.success('Configurações do site salvas com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar configurações do site:", error);
      toast.error('Erro ao salvar configurações do site.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais do Site</CardTitle>
        <CardDescription>Altere o nome do seu estabelecimento.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="establishmentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Estabelecimento</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Sabor da Rua" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-brand-DEFAULT hover:bg-brand-dark text-white" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Nome do Estabelecimento"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SiteSettingsManager;
