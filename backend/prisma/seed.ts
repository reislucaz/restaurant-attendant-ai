import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  const pizzas = [
    {
      name: 'Margherita',
      description: 'Molho de tomate, mussarela, tomate e manjericão',
      category: Category.PIZZA,
      price: 45.9,
    },
    {
      name: 'Pepperoni',
      description: 'Molho de tomate, mussarela e pepperoni',
      category: Category.PIZZA,
      price: 49.9,
    },
    {
      name: 'Quatro Queijos',
      description:
        'Molho de tomate, mussarela, parmesão, gorgonzola e catupiry',
      category: Category.PIZZA,
      price: 52.9,
    },
    {
      name: 'Frango com Catupiry',
      description: 'Molho de tomate, mussarela, frango desfiado e catupiry',
      category: Category.PIZZA,
      price: 48.9,
    },
  ];

  const beverages = [
    {
      name: 'Coca-Cola 350ml',
      description: 'Refrigerante Coca-Cola lata',
      category: Category.BEVERAGE,
      price: 6.9,
    },
    {
      name: 'Guaraná 350ml',
      description: 'Refrigerante Guaraná lata',
      category: Category.BEVERAGE,
      price: 6.9,
    },
    {
      name: 'Água Mineral 500ml',
      description: 'Água mineral sem gás',
      category: Category.BEVERAGE,
      price: 4.9,
    },
  ];

  const desserts = [
    {
      name: 'Pudim',
      description: 'Pudim de leite condensado com calda de caramelo',
      category: Category.DESSERT,
      price: 12.9,
    },
    {
      name: 'Mousse de Chocolate',
      description: 'Mousse de chocolate com raspas de chocolate',
      category: Category.DESSERT,
      price: 14.9,
    },
  ];

  await prisma.product.createMany({
    data: [...pizzas, ...beverages, ...desserts],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
