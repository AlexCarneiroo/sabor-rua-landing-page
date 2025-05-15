
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Usaremos Textarea para descrição
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const dishFormSchema = z.object({
  name: z.string().min(3, "Nome muito curto").max(100, "Nome muito longo"),
  description: z.string().min(10, "Descrição muito curta").max(500, "Descrição muito longa"),
  price: z.string().regex(/^\R\$\s\d+(,\d{2})?$/, "Preço inválido. Ex: R$ 10,90"), // Ex: R$ 10,90
  imageSrc: z.string().url("URL da imagem inválida"),
});

export type DishFormValues = z.infer<typeof dishFormSchema>;

interface DishFormProps {
  onSubmit: (data: DishFormValues) => Promise<void>;
  defaultValues?: Partial<DishFormValues>;
  isEditing?: boolean;
  isLoading?: boolean;
}

const DishForm: React.FC<DishFormProps> = ({ onSubmit, defaultValues, isEditing = false, isLoading = false }) => {
  const form = useForm<DishFormValues>({
    resolver: zodResolver(dishFormSchema),
    defaultValues: defaultValues || { name: '', description: '', price: 'R$ ', imageSrc: '' },
  });

  React.useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Prato</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Pizza Calabresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex: Molho de tomate, calabresa, cebola..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: R$ 35,00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageSrc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://exemplo.com/imagem.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="bg-brand-DEFAULT hover:bg-brand-dark text-white">
          {isLoading ? (isEditing ? 'Salvando...' : 'Adicionando...') : (isEditing ? 'Salvar Alterações' : 'Adicionar Prato')}
        </Button>
      </form>
    </Form>
  );
};

export default DishForm;
