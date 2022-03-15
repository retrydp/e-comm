import slugify from 'slugify';

const slug = (str: string) =>
  slugify(str, {
    replacement: '-',
    lower: true,
    strict: true,
    locale: 'vi', // language code of the locale to use
    trim: true,
  });

const data = {
  products: [
    {
      slug: slug('Nike Air Max 270 React'),
      name: 'Nike Air Max 270 React',
      description: 'This is a sample product',
      category: 'sneakers',
      brand: 'nike',
      price: '110.00',
      oldPrice: '122.50',
      color: 'white',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/9e191f45-9227-49a4-97a6-806487a55a34/air-huarache-le-sneakers-7ggQkX.png',
      ],
      rating: 4,
      salesCount: 0,
      itemsInStock: 21,
      numReviews: 0,
    },
    {
      slug: slug('Nike Metcon 7 FlyEase'),
      name: 'Nike Metcon 7 FlyEase',
      description:
        'The Nike Metcon 7 FlyEase refines stability and durability to stand up to the push and pull of serious strength training.Lightweight, responsive cushioning dials up the comfort during workouts that include lifting, high-intensity intervals—even sprints and short runs.The training shoe has a collapsible heel that lets you step in without using your hands, then it snaps back up to secure your foot.',
      category: 'sneakers',
      brand: 'nike',
      price: '114.95',
      oldPrice: '199.99',
      color: 'orange',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/fb149f6b-c850-4708-ac13-1c2cb4df89d5/metcon-7-flyease-training-sneakers-RKGv1m.png',
      ],
      rating: 5,
      salesCount: 0,
      itemsInStock: 2,
      numReviews: 0,
    },
    {
      slug: slug('Zoom Freak 3'),
      name: 'Zoom Freak 3',
      description:
        "Giannis is an athlete of freakish power and incredible range.His ability to play any position make him difficult to guard and nearly impossible to stop.The Zoom Freak 3 helps Giannis create space with his massive strides and misdirecting Euro-step.The moulded midfoot strap and external overlay provide side-to-side stability when he's powering to the rim, while the multi-directional traction helps him stay in control",
      category: 'sneakers',
      brand: 'nike',
      price: '112.95',
      oldPrice: '0',
      color: 'white',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/a11a8441-433f-420e-b77a-66314b3a36e4/zoom-freak-3-basketball-sneakers-MZpJZF.png',
      ],
      rating: 4,
      salesCount: 0,
      itemsInStock: 49,
      numReviews: 0,
    },
    {
      slug: slug('Air Jordan 1 Mid SE'),
      name: 'Air Jordan 1 Mid SE',
      description:
        "Ground your style in Flight with the Air Jordan 1 Mid, the sneaker of endless possibilities.Fresh as ever, this special edition of the famous mid-top shoe delivers non-stop comfort for anyone who can't get enough of the heritage classic.",
      category: 'sneakers',
      brand: 'nike',
      price: '114.95',
      oldPrice: '0',
      color: 'red',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/5b28b624-db76-4407-9405-107ba7f7ae17/air-jordan-1-mid-se-sneakers-MkNjwX.png',
      ],
      rating: 3.5,
      salesCount: 0,
      itemsInStock: 2,
      numReviews: 0,
    },
    {
      slug: slug('Nike Mercurial Superfly 8 Elite KM FG'),
      name: 'Nike Mercurial Superfly 8 Elite KM FG',
      description:
        "Embody Kylian Mbappé's relentless pace with fiery design details.A Flyknit upper wraps your foot in lightweight fabric that moves with you when it's time to turn up the heat.",
      category: 'sneakers',
      brand: 'nike',
      price: '259.95',
      oldPrice: '399.50',
      color: 'blue',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/d68e4316-3ae3-4fb7-81c6-dc9c0031597e/mercurial-superfly-8-elite-km-fg-football-boot-T8WWXB.png',
      ],
      rating: 2.4,
      salesCount: 0,
      itemsInStock: 3,
      numReviews: 0,
    },
    {
      slug: slug('Nike Dunk Low Retro'),
      name: 'Nike Dunk Low Retro',
      description:
        "Created for the hardwood but taken to the streets, the '80s basketball icon returns with classic details and throwback hoops flair. Its padded, low-cut collar and foam midsole let you take your game anywhere—in comfort.",
      category: 'sneakers',
      brand: 'nike',
      price: '89.95',
      oldPrice: '0',
      color: 'blue',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/71e7d884-0501-4566-aa20-2e360b0c23ae/dunk-low-retro-sneakers-nL8831.png',
      ],
      rating: 4.5,
      salesCount: 0,
      itemsInStock: 0,
      numReviews: 0,
    },
    {
      slug: slug('Paris Saint-Germain'),
      name: 'Paris Saint-Germain',
      description:
        "Don't let the small size fool you.The Paris Saint-Germain Cross-Body Bag is plenty spacious for your everyday essentials.It has 2 zip compartments with enough room for storing your smartphone, wallet and keys.",
      category: 'bags',
      brand: 'nike',
      price: '31.95',
      oldPrice: '37.99',
      color: 'grey',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/3e008860-d72f-4d8b-82d6-7a68bf497e7d/paris-saint-germain-cross-body-bag-Fjk6lm.png',
      ],
      rating: 5,
      salesCount: 0,
      itemsInStock: 2,
      numReviews: 0,
    },
    {
      slug: slug("Women's Futura 365 Cross-Body Bag (3L)"),
      name: "Women's Futura 365 Cross-Body Bag (3L)",
      description:
        "A clean design that fits your style and your essentials, the Nike Sportswear Futura Cross-Body Bag features a zip back pocket and magnetic flap closure. It's made from fabric that contains a blend of at least 75% recycled fibres.",
      category: 'bags',
      brand: 'nike',
      price: '17.95',
      oldPrice: '0',
      color: 'pink',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/46e0a00f-07c5-4096-a43b-013f72341f1d/sportswear-futura-365-cross-body-bag-3ngRJp.png',
      ],
      rating: 2.5,
      salesCount: 0,
      itemsInStock: 11,
      numReviews: 0,
    },
    {
      slug: slug('Nike Brasilia'),
      name: 'Nike Brasilia',
      description:
        'Rep the Swoosh wave from class to your next adventure with the Nike Brasilia Backpack. The roomy inside has pockets to organize your essentials, and pouches on each side give easy access to your water bottle and other quick-grab items. Functional, awesome and stylish? Check.',
      category: 'bags',
      brand: 'nike',
      price: '27.95',
      oldPrice: '30.00',
      color: 'black',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/f0e47a0c-83b6-4925-8263-a670c811154f/brasilia-printed-backpack-gmlCzm.png',
      ],
      rating: 4.5,
      salesCount: 0,
      itemsInStock: 4,
      numReviews: 0,
    },
    {
      slug: slug('Nike Brasilia JDI'),
      name: 'Nike Brasilia JDI',
      description:
        "Don't be fooled by its small size, the Nike Brasilia JDI Backpack is plenty spacious.With zipped pockets, water bottle storage and comfy straps, this bag is easy to carry for your daily adventures.",
      category: 'bags',
      brand: 'nike',
      price: '17.95',
      oldPrice: '21.99',
      color: 'blue',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/114d4ce8-bab2-4a14-b3b3-f04c7ddf0507/brasilia-jdi-backpack-xzV0lP.png',
      ],
      rating: 4,
      salesCount: 0,
      itemsInStock: 7,
      numReviews: 0,
    },
  ],
};

export default data;
