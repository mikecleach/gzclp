import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Routine } from "./Routine";
import { T1set } from "./T1set";
import { User } from "./User";

@Entity()
export class Workout extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Routine, routine => routine.id)
    routine: Routine[];

    @OneToMany(type => T1set, t1set => t1set.workout)
    T1set: T1set[];
}
