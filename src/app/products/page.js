"use client";
import Header from "@/components/Header/header";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AppContainer from "@/components/Contaner/container";
import { Image, Card, CardBody, CardFooter } from "@nextui-org/react";


export default function Products() {
    const [list, setList] = useState([]);
    const [cats, setCats] = useState([]);
  
    const getProducts = async (cat) => {
        let url = "http://localhost:3000/api/products";
        if (cat) url = `http://localhost:3000/api/products?cat=${cat}`;

        try {
            let res = await fetch(url);
            let jsonData = await res.json();
            setList(jsonData);
        } catch (error) { }
    };

    const getCategories = async () => {
        try {
            let res = await fetch("http://localhost:3000/api/categories");
            let jsonData = await res.json();
            setCats(jsonData);
        } catch (error) { }
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    return (
        <main className={styles.main}>
            <Header page="PRODUCTS" />
            <AppContainer width={1300}>
                <div className={styles.items}>
                    <div className={styles.categories}>
                        {cats.map((el) => (
                            <Card isPressable onPress={() => getProducts(el.id)}>
                                <CardBody>
                                    <p>{el.name}</p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                    <div className="gap-6 grid grid-cols-2 sm:grid-cols-4">
                        {list.map((item, index) => (
                            <Card
                                shadow="sm"
                                key={index}
                                
                            >
                                <CardBody className="overflow-visible p-0">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt={item.name}
                                        className="w-full object-cover h-[140px]"
                                        src={item.image}
                                    />
                                </CardBody>
                                <CardFooter className="text-small justify-between">
                                    <b>{item.name}</b>
                                    <p className="text-default-500">{item.price}</p>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </AppContainer>
        </main>
    );
}