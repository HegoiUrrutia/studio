'use client';
import { useFirestore, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/lib/seed-data';
import { useToast } from '@/hooks/use-toast';

export function Seeder() {
    const firestore = useFirestore();
    const { toast } = useToast();

    const seedDatabase = async () => {
        try {
            toast({ title: "Seeding database...", description: "Please wait." });
            for (const category of categories) {
                const { id, ...data } = category;
                const categoryRef = doc(firestore, 'categories', id);
                setDocumentNonBlocking(categoryRef, data, { merge: true });
            }

            for (const product of products) {
                const { id, ...data } = product;
                const productRef = doc(firestore, 'products', id);
                setDocumentNonBlocking(productRef, data, { merge: true });
            }
            
            toast({ title: "Database seeded successfully!", description: "Please refresh the page to see the products." });

        } catch (e) {
            console.error('Error seeding database:', e);
            toast({ variant: "destructive", title: "Error seeding database", description: "Check the console for more details." });
        }
    };

    return (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 text-center">
            <h3 className="text-xl font-semibold tracking-tight">Your product catalog is empty</h3>
            <p className="text-muted-foreground">Add some sample products to get started.</p>
            <Button onClick={seedDatabase} className="mt-4">Seed Sample Products</Button>
        </div>
    );
}
