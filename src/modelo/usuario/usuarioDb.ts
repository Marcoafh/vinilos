/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ViniloDb } from "../anuncio/viniloDb";
import { MensajeDb } from "../mensaje/mensajeDb";


@Entity({name: 'usuario'})
export class UsuarioDb  {
    @PrimaryGeneratedColumn()
      id: number;
    @Column()
      email: string;
    @Column()
      pass: string;
    @Column()
      telefono: number;
    @Column()
      abatar: string;
     @Column()
      nombre: string;
     @Column()
      apellidos: string;
     @OneToMany(() => ViniloDb, (vinilo: ViniloDb) => vinilo.owner)
      vinilos: ViniloDb[]
      @OneToMany(() => MensajeDb, (mensaje: MensajeDb) => mensaje.usuarioid)
      mensajes: MensajeDb[]
    

    }
     
    
      


