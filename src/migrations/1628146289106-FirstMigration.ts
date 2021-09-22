import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1628146289106 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS photo (
            id SERIAL PRIMARY KEY,
            ad_id INTEGER NOT NULL,
            photo VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT now() NOT NULL,
            updated_at TIMESTAMP DEFAULT now() NOT NULL
        );`);
        
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS ad (
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            decription TEXT NOT NULL,
            price INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT now() NOT NULL,
            updated_at TIMESTAMP DEFAULT now() NOT NULL
        );`);

        await queryRunner.query(`ALTER TABLE photo ADD CONSTRAINT fk_ad FOREIGN KEY(ad_id) REFERENCES ad(id)`)    

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.user (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password_hash VARCHAR(50) NOT NULL,
            phone_number VARCHAR(15) NOT NULL,
            role VARCHAR(15) DEFAULT 'registeredUser' NOT NULL,
            created_at TIMESTAMP DEFAULT now() NOT NULL,
            updated_at TIMESTAMP DEFAULT now() NOT NULL,
            UNIQUE(email),
            UNIQUE(phone_number)
        );`);

        await queryRunner.query(`ALTER TABLE ad ADD CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES public.user(id)`)

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS purchase (
            id SERIAL PRIMARY KEY,
            ad_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT now() NOT NULL,
            updated_at TIMESTAMP DEFAULT now() NOT NULL,
            FOREIGN KEY(ad_id) REFERENCES ad(id),
            FOREIGN KEY(user_id) REFERENCES public.user(id)
        )`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS room (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP DEFAULT now() NOT NULL,
            updated_at TIMESTAMP DEFAULT now() NOT NULL
        );`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS message (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            room_id INTEGER NOT NULL, 
            created_at TIMESTAMP DEFAULT now() NOT NULL,
            updated_at TIMESTAMP DEFAULT now() NOT NULL,
            FOREIGN KEY(user_id) REFERENCES public.user(id),
            FOREIGN KEY(room_id) REFERENCES room(id)
        );`);
        
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS room_user (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            room_id INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT now() NOT NULL,
            updated_at TIMESTAMP DEFAULT now() NOT NULL,
            FOREIGN KEY(user_id) REFERENCES public.user(id),
            FOREIGN KEY(room_id) REFERENCES room(id)
        );`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE room_user;`)
        await queryRunner.query(`DROP TABLE message`);
        await queryRunner.query(`DROP TABLE room;`)
        await queryRunner.query(`DROP TABLE purchase`)
        await queryRunner.query(`DROP TABLE public.user CASCADE;`);
        await queryRunner.query(`DROP TABLE ad CASCADE;`)
        await queryRunner.query(`DROP TABLE photo;`)
    }

}
