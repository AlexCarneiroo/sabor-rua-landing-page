
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription as ShadcnCardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { themes } from '@/lib/themes'; // Importar os temas

const siteSettingsFormSchema = z.object({
  establishmentName: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }).max(50, { message: "O nome não pode ter mais de 50 caracteres." }),
  activeThemeName: z.string({ required_error: "Por favor, selecione um tema." }).optional(),
});

type SiteSettingsFormValues = z.infer<typeof siteSettingsFormSchema>;

const defaultSiteSettings: SiteSettingsFormValues = {
  establishmentName: "Sabor da Rua",
  activeThemeName: themes[0].name, // Usar o nome do primeiro tema como padrão
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
          const data = docSnap.data() as SiteSettingsFormValues;
          // Ensure activeThemeName has a fallback if it's missing from DB
          form.reset({
            ...data,
            activeThemeName: data.activeThemeName || defaultSiteSettings.activeThemeName,
          });
        } else {
          form.reset(defaultSiteSettings);
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
      // Ensure theme is saved, even if it's the default from the form state
      const dataToSave = {
        ...data,
        activeThemeName: data.activeThemeName || defaultSiteSettings.activeThemeName,
      };
      await setDoc(settingsDocRef, dataToSave, { merge: true }); // Use merge:true para não sobrescrever outros campos não gerenciados aqui
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
        <ShadcnCardDescription>Altere o nome do seu estabelecimento e o tema de cores do site.</ShadcnCardDescription>
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

            <FormField
              control={form.control}
              name="activeThemeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema de Cores</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value || defaultSiteSettings.activeThemeName}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.name} value={theme.name}>
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Escolha um esquema de cores para o seu site.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="bg-brand-DEFAULT hover:bg-brand-dark text-white" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Configurações"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SiteSettingsManager;

