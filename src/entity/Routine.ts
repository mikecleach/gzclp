import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinColumn } from "typeorm";
import { Exercise } from "./Exercise";
import { User } from "./User";

@Entity()
export class Routine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => Exercise, exercise => exercise.id)
    T1: Exercise[];

    @ManyToOne(type => Exercise, exercise => exercise.id)
    T2: Exercise[];

    @ManyToOne(type => Exercise, exercise => exercise.id)
    T3: Exercise[];

    @ManyToMany(type => User, users => users.routines)
    users: User[];
}
