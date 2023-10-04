/* eslint-disable prettier/prettier */
import { Column,Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioDb } from "../usuario/usuarioDb";
import { ViniloDb } from "../anuncio/viniloDb";


@Entity({name: 'mensaje'})
export class MensajeDb  {
    
    @PrimaryGeneratedColumn()
     id: number;
    @Column()
     mensaje: string;
   
   
     @ManyToOne(() => UsuarioDb, (usuarioid: UsuarioDb) => usuarioid.mensajes)
     @JoinColumn({ name: 'usuarioid' })
     usuarioid: UsuarioDb;
     
    
     @ManyToOne(() => ViniloDb, (viniloid: ViniloDb) => viniloid.mensajes)
     @JoinColumn({ name: 'viniloid' })
     viniloid: ViniloDb;

     @Column() // Campo para almacenar el ID del receptor
     receptor: number;
}

    

    

    
    