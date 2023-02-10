export type ListProps = {
  id?: number;
  name: string;
};

export class List {
  id: number;
  name: string;

  constructor(props: ListProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
