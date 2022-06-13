import { createServer, Factory, Model, ActiveModelSerializer } from 'miragejs'
import { faker } from '@faker-js/faker';

type Register = {
    name: string;
    email: string;
    createdAt: string;
}

export function makeServer() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },
        models: {
            register: Model.extend<Partial<Register>>({})
        },

        factories: {
            register: Factory.extend({
                name(i: number) {
                    return `Register ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase()
                },
                createdAt() {
                    return faker.date.recent(10)
                },
            })
        },

        seeds(server) {
            server.createList('register', 10)
        },

        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/register');
            this.post('/register');

            this.namespace = '';
            this.passthrough();
        }
    })

    return server;
}