
export interface ColorTheme {
  name: string;
  colors: {
    '--background': string;
    '--foreground': string;
    '--card': string;
    '--card-foreground': string;
    '--popover': string;
    '--popover-foreground': string;
    '--primary': string;
    '--primary-foreground': string;
    '--secondary': string;
    '--secondary-foreground': string;
    '--muted': string;
    '--muted-foreground': string;
    '--accent': string;
    '--accent-foreground': string;
    '--destructive': string;
    '--destructive-foreground': string;
    '--border': string;
    '--input': string;
    '--ring': string;
    '--radius': string;

    // Sidebar colors
    '--sidebar-background': string;
    '--sidebar-foreground': string;
    '--sidebar-primary': string;
    '--sidebar-primary-foreground': string;
    '--sidebar-accent': string;
    '--sidebar-accent-foreground': string;
    '--sidebar-border': string;
    '--sidebar-ring': string;
  };
}

export const themes: ColorTheme[] = [
  {
    name: "Padrão Escuro (Azul Brilhante)",
    colors: {
      '--background': '270 8% 13%', // Dark Charcoal #221F26
      '--foreground': '240 3% 78%', // Light Gray #C8C8C9
      '--card': '270 8% 18%',
      '--card-foreground': '240 3% 78%',
      '--popover': '270 8% 18%',
      '--popover-foreground': '240 3% 78%',
      '--primary': '196 80% 52%', // Bright Blue #1EAEDB
      '--primary-foreground': '210 40% 98%',
      '--secondary': '270 2% 55%',
      '--secondary-foreground': '240 3% 78%',
      '--muted': '270 5% 30%',
      '--muted-foreground': '240 4% 65%',
      '--accent': '200 85% 60%',
      '--accent-foreground': '210 40% 98%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '270 5% 25%',
      '--input': '270 5% 22%',
      '--ring': '196 80% 52%',
      '--radius': '0.5rem',
      '--sidebar-background': '270 8% 16%',
      '--sidebar-foreground': '240 3% 80%',
      '--sidebar-primary': '196 80% 52%',
      '--sidebar-primary-foreground': '210 40% 98%',
      '--sidebar-accent': '200 85% 60%',
      '--sidebar-accent-foreground': '210 40% 98%',
      '--sidebar-border': '270 5% 28%',
      '--sidebar-ring': '196 80% 52%',
    }
  },
  {
    name: "Roxo Vibrante",
    colors: {
      '--background': '266 40% 10%',
      '--foreground': '270 10% 85%',
      '--card': '266 40% 15%',
      '--card-foreground': '270 10% 85%',
      '--popover': '266 40% 15%',
      '--popover-foreground': '270 10% 85%',
      '--primary': '280 80% 60%',
      '--primary-foreground': '0 0% 98%',
      '--secondary': '270 20% 45%',
      '--secondary-foreground': '270 10% 85%',
      '--muted': '270 15% 30%',
      '--muted-foreground': '270 10% 65%',
      '--accent': '300 70% 65%',
      '--accent-foreground': '0 0% 98%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '266 30% 25%',
      '--input': '266 30% 20%',
      '--ring': '280 80% 60%',
      '--radius': '0.5rem',
      '--sidebar-background': '266 40% 12%',
      '--sidebar-foreground': '270 10% 88%',
      '--sidebar-primary': '280 80% 60%',
      '--sidebar-primary-foreground': '0 0% 98%',
      '--sidebar-accent': '300 70% 65%',
      '--sidebar-accent-foreground': '0 0% 98%',
      '--sidebar-border': '266 30% 28%',
      '--sidebar-ring': '280 80% 60%',
    }
  },
  {
    name: "Verde Natureza",
    colors: {
        '--background': '120 20% 10%',
        '--foreground': '100 10% 80%',
        '--card': '120 20% 15%',
        '--card-foreground': '100 10% 80%',
        '--popover': '120 20% 15%',
        '--popover-foreground': '100 10% 80%',
        '--primary': '140 60% 45%',
        '--primary-foreground': '0 0% 98%',
        '--secondary': '110 25% 40%',
        '--secondary-foreground': '100 10% 80%',
        '--muted': '100 15% 30%',
        '--muted-foreground': '100 10% 60%',
        '--accent': '90 50% 55%',
        '--accent-foreground': '0 0% 98%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '120 15% 25%',
        '--input': '120 15% 20%',
        '--ring': '140 60% 45%',
        '--radius': '0.5rem',
        '--sidebar-background': '120 20% 12%',
        '--sidebar-foreground': '100 10% 82%',
        '--sidebar-primary': '140 60% 45%',
        '--sidebar-primary-foreground': '0 0% 98%',
        '--sidebar-accent': '90 50% 55%',
        '--sidebar-accent-foreground': '0 0% 98%',
        '--sidebar-border': '120 15% 28%',
        '--sidebar-ring': '140 60% 45%',
    }
  },
  {
    name: "Pôr do Sol Quente",
    colors: {
        '--background': '25 40% 12%',
        '--foreground': '30 20% 85%',
        '--card': '25 40% 18%',
        '--card-foreground': '30 20% 85%',
        '--popover': '25 40% 18%',
        '--popover-foreground': '30 20% 85%',
        '--primary': '30 90% 55%',
        '--primary-foreground': '0 0% 98%',
        '--secondary': '20 50% 50%',
        '--secondary-foreground': '30 20% 85%',
        '--muted': '20 30% 35%',
        '--muted-foreground': '30 15% 65%',
        '--accent': '45 80% 60%',
        '--accent-foreground': '0 0% 98%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '25 30% 28%',
        '--input': '25 30% 22%',
        '--ring': '30 90% 55%',
        '--radius': '0.5rem',
        '--sidebar-background': '25 40% 14%',
        '--sidebar-foreground': '30 20% 88%',
        '--sidebar-primary': '30 90% 55%',
        '--sidebar-primary-foreground': '0 0% 98%',
        '--sidebar-accent': '45 80% 60%',
        '--sidebar-accent-foreground': '0 0% 98%',
        '--sidebar-border': '25 30% 30%',
        '--sidebar-ring': '30 90% 55%',
    }
  },
  {
    name: "Claro Elegante (Azul Primário)",
    colors: {
      '--background': '0 0% 100%',
      '--foreground': '240 10% 15%',
      '--card': '0 0% 96%',
      '--card-foreground': '240 10% 15%',
      '--popover': '0 0% 96%',
      '--popover-foreground': '240 10% 15%',
      '--primary': '196 80% 52%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '240 5% 85%',
      '--secondary-foreground': '240 10% 25%',
      '--muted': '240 5% 90%',
      '--muted-foreground': '240 5% 50%',
      '--accent': '200 85% 60%',
      '--accent-foreground': '210 40% 98%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '240 5% 88%',
      '--input': '0 0% 94%',
      '--ring': '196 80% 52%',
      '--radius': '0.5rem',
      '--sidebar-background': '0 0% 98%',
      '--sidebar-foreground': '240 10% 20%',
      '--sidebar-primary': '196 80% 52%',
      '--sidebar-primary-foreground': '210 40% 98%',
      '--sidebar-accent': '200 85% 60%',
      '--sidebar-accent-foreground': '210 40% 98%',
      '--sidebar-border': '240 5% 90%',
      '--sidebar-ring': '196 80% 52%',
    }
  }
];

