
// import * as bcrypt from 'bcrypt';

// This is the data to load or fill out database once you run the seed

interface SeedProduct {
    description: string;
    images: string[];
    stock: number;
    price: number;
    sizes: ValidSizes[];
    tags: string[];
    name: string;
    // type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
// type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

interface SeedUser {
    email: string;
    password: string;
    fullName: string;
    roles: string[];
}

interface SeedData {
    // users: SeedUser[];
    products: SeedProduct[];
}


export const initialData: SeedData = {
    // users: [
    //     {
    //         email: "test1@google.com",
    //         password: bcrypt.hashSync('Abc123', 10),
    //         fullName: "Test One",
    //         roles: [ 'admin' ]
    //     },
    //     {
    //         email: "test2@google.com",
    //         password: bcrypt.hashSync('Abc123', 10),
    //         fullName: "Test Two",
    //         roles: [ 'user', 'super-user' ]
    //     },
    // ],
    products: [
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ],
            stock: 7,
            price: 75,
            sizes: ['XS','S','M','L','XL','XXL'],
            tags: ['sweatshirt'],
            name: "Men’s Chill Crew Neck Sweatshirt",
            gender: 'men'
        },
        {
            description: "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            images: [
                '1740507-00-A_0_2000.jpg',
                '1740507-00-A_1.jpg',
            ],
            stock: 5,
            price: 200,
            sizes: ['XS','S','M','XL','XXL'],
            tags: ['jacket'],
            name: "Men's Quilted Shirt Jacket",
            gender: 'men'
        },
        
        {
            description: "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
            images: [
                '1740250-00-A_0_2000.jpg',
                '1740250-00-A_1.jpg'
            ],
            stock: 10,
            price: 130,
            sizes: ['S','M','L','XL','XXL'],
            tags: ['shirt'],
            name: "Men's Raven Lightweight Zip Up Bomber Jacket",
            gender: 'men'
        },

        {
            description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            images: [
                '1740280-00-A_0_2000.jpg',
                '1740280-00-A_1.jpg',
            ],
            stock: 50,
            price: 45,
            sizes: ['XS','S','M','L'],
            tags: ['shirt'],
            name: "Men's Turbine Long Sleeve Tee",
            gender: 'men'
        },
        {
            description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            images: [
                '1741416-00-A_0_2000.jpg',
                '1741416-00-A_1.jpg',
            ],
            stock: 50,
            price: 40,
            sizes: ['M','L','XL','XXL'],
            tags: ['shirt'],
            name: "Men's Turbine Short Sleeve Tee",
            gender: 'men'
        },
        {
            description: "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
            images: [
                '7654393-00-A_2_2000.jpg',
                '7654393-00-A_3.jpg',
            ],
            stock: 0,
            price: 35,
            sizes: ['M','L','XL','XXL'],
            tags: ['shirt'],
            name: "Men's Cybertruck Owl Tee",
            gender: 'men'
        },
        {
            description: "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
            images: [
                '1703767-00-A_0_2000.jpg',
                '1703767-00-A_1.jpg',
            ],
            stock: 15,
            price: 35,
            sizes: ['S','M','L','XL'],
            tags: ['shirt'],
            name: "Men's Solar Roof Tee",
            gender: 'men'
        },
        {
            description: "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
            images: [
                '1700280-00-A_0_2000.jpg',
                '1700280-00-A_1.jpg',
            ],
            stock: 17,
            price: 35,
            sizes: ['XS','S','XL','XXL'],
            tags: ['shirt'],
            name: "Men's Let the Sun Shine Tee",
            gender: 'men'
        },
        {
            description: "Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
            images: [
                '8764734-00-A_0_2000.jpg',
                '8764734-00-A_1.jpg',
            ],
            stock: 12,
            price: 35,
            sizes: ['XS','S','M'],
            tags: ['shirt'],
            name: "Men's 3D Large Wordmark Tee",
            gender: 'men'
        },
        {
            description: "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
            images: [
                '7652426-00-A_0_2000.jpg',
                '7652426-00-A_1.jpg',
            ],
            stock: 5,
            price: 35,
            sizes: ['XS','S'],
            tags: ['shirt'],
            name: "Men's 3D T Logo Tee",
            gender: 'men'
        },
        {
            description: "Designed for comfort and style in any size, the Tesla Small Wordmark Tee is made from 100% Peruvian cotton and features a 3D silicone-printed wordmark on the left chest.",
            images: [
                '8528839-00-A_0_2000.jpg',
                '8528839-00-A_2.jpg',
            ],
            stock: 2,
            price: 35,
            sizes: ['XS','S','M'],
            tags: ['shirt'],
            name: "Men’s 3D Small Wordmark Tee",
            gender: 'men'
        },
        {
            description: "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
            images: [
                '1549268-00-A_0_2000.jpg',
                '1549268-00-A_2.jpg',
            ],
            stock: 82,
            price: 35,
            sizes: ['XS','S','M','L','XL','XXL'],
            tags: ['shirt'],
            name: "Men's Plaid Mode Tee",
            gender: 'men'
        },
        {
            description: "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any environment.",
            images: [
                '9877034-00-A_0_2000.jpg',
                '9877034-00-A_2.jpg',
            ],
            stock: 24,
            price: 35,
            sizes: ['XL','XXL'],
            tags: ['shirt'],
            name: "Men's Powerwall Tee",
            gender: 'men'
        },
        {
            description: "Inspired by Tesla Battery Day and featuring the unveiled tabless battery cell, Battery Day Tee celebrates the future of energy storage and cell manufacturing. Designed for fit, comfort and style, Battery Day Tee is made from 100% cotton with a stylized cell printed across the chest. Made in Peru.",
            images: [
                '1633802-00-A_0_2000.jpg',
                '1633802-00-A_2.jpg',
            ],
            stock: 5,
            price: 30,
            sizes: ['XS','S','XXL'],
            tags: ['shirt'],
            name: "Men's Battery Day Tee",
            gender: 'men'
        },
        {
            description: "Designed for exceptional comfort and inspired by the Cybertruck unveil event, the Cybertruck Bulletproof Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
            images: [
                '7654399-00-A_0_2000.jpg',
                '7654399-00-A_1.jpg',
            ],
            stock: 150,
            price: 30,
            sizes: ['M','L'],
            tags: ['shirt'],
            name: "Men’s Cybertruck Bulletproof Tee",
            gender: 'men'
        },
        
    ]
}