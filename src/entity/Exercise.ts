import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Routine } from "./Routine";

@Entity()
export class Exercise extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(type => Routine, routine => routine.id)
    T1: Routine;

    @OneToMany(type => Routine, routine => routine.id)
    T2: Routine;

    @OneToMany(type => Routine, routine => routine.id)
    T3: Routine;
}
