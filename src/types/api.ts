export type Smoothie = {
  id: number;
  title: string;
  method: string;
  rating: number;
  onDelete: (id:number) => void;
};