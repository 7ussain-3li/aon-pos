"use client";
import Header from "@/components/Header/header";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AppContainer from "@/components/Contaner/container";
import { Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


export default function Categories() {
    const [cats, setCats] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [newCategoryName, setNewCategoryName] = useState("");
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onOpenChange: onOpenChangeDeleteModal } = useDisclosure();

    const getCategories = async () => {
        try {
            let res = await fetch("http://localhost:3000/api/categories");
            let jsonData = await res.json();
            setCats(jsonData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const closeModal = () => {
        onOpenChange(false);
    };

    const addCategory = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newCategoryName }),
            });

            const jsonData = await res.json();

            if (jsonData.success) {
                setCats((prevCats) => [...prevCats, { id: jsonData.id, name: newCategoryName }]);
                getCategories();
                closeModal();
                setNewCategoryName("");
            } else {
                console.log(jsonData.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory = (id) => {
        setCategoryToDelete(id);
        onOpenDeleteModal();
    }

    const deleteCategoryConfirmed = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const jsonData = await res.json();
            if (jsonData.success) {
                setCats((prevCats) => prevCats.filter((el) => el.id !== id));
                getCategories();
            } else {
                console.log(jsonData.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className={styles.main}>
            <Header page="CATEGORIES" />
            <AppContainer width={1300}>
                <h1 className={styles.title}>All Categories</h1>
                <div className={styles.categories}>
                    {cats.map((el) => (
                        <Card key={el.id} className={styles.card}>
                            <CardBody>
                                <p className={styles.text}>{el.name}</p>
                                <Button color="error" onPress={() => deleteCategory(el.id)}>Delete</Button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <Button onPress={onOpen} className="max-w-fit" size="lg" placement="center">
                        Add Category
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        placement="center"
                        onOpenChange={onOpenChange}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Add Category</ModalHeader>
                                    <ModalBody>
                                        <input
                                            type="text"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            placeholder="Enter Category Name"
                                            className="w-full"
                                            style={{ height: "40px", borderRadius: "8px", padding: "0 12px", border: "1px solid #ccc", outline: "none" }}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={() => addCategory()}>
                                            Add
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                     {/* Below is the Cofirmation Modal for the deletion of category */}

                    <Modal isOpen={isDeleteModalOpen} placement="center" onOpenChange={onOpenChangeDeleteModal}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        {categoryToDelete ? `Delete ${cats.find((el) => el.id === categoryToDelete)?.name}` : 'Add Category'}
                                    </ModalHeader>
                                    <ModalBody>
                                        {categoryToDelete ? (
                                            <p>Are you sure you want to delete this category?</p>
                                        ) : (
                                            <input
                                                type="text"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                                placeholder="Enter Category Name"
                                                className="w-full"
                                                style={{ height: "40px", borderRadius: "8px", padding: "0 12px", border: "1px solid #ccc", outline: "none" }}
                                            />
                                        )}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={() => { onClose(); setCategoryToDelete(null); }}>
                                            Close
                                        </Button>
                                        {categoryToDelete ? (
                                            <Button color="primary" onPress={() => { deleteCategoryConfirmed(categoryToDelete); onClose(); setCategoryToDelete(null); }}>
                                                Delete
                                            </Button>
                                        ) : (
                                            <Button color="primary" onPress={() => addCategory()}>
                                                Add
                                            </Button>
                                        )}
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </AppContainer>
        </main>
    )
}