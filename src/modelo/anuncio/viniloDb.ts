/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioDb } from "../usuario/usuarioDb";
import { MensajeDb } from "../mensaje/mensajeDb";


@Entity({name: 'vinilo'})
export class ViniloDb  {
    @PrimaryGeneratedColumn()
     id: number;
    @Column()
     titulo: string;
    @Column()
     contenido: string;
    @Column()
     foto: string;
    @Column()
     precio: number;
    @CreateDateColumn()
    created_at:number;
    @Column()
     estado: string;
    @Column()
     tras: string;
    @Column()
     tipo: string;

     @ManyToOne(() => UsuarioDb, (owner: UsuarioDb) => owner.vinilos)
     @JoinColumn({ name: 'owner_id' })
     owner: UsuarioDb;

     
     @Column()
     estilo: string;
     @Column()
     lugar: string;

    

     @OneToMany(() => MensajeDb, (mensaje: MensajeDb) => mensaje.viniloid)
      mensajes: MensajeDb[];
      

    }

    
     
    
      



