import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinColumn, OneToMany } from "typeorm";
import { Workout } from "./Workout";
import { User } from "./User";

@Entity()
export class T1set extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order: number;

    @Column()
    weight: number;

    @Column()
    reps: number;

    @Column()
    completed: boolean;

    @ManyToOne(type => Workout, workout => workout.T1set)
    workout: Workout;
}
