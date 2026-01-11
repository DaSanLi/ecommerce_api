import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { RequestWithUser } from '../auth/utilities/types';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), './schema.gql'),
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
            context: ({ req }: { req: RequestWithUser }) => ({ req }),
        }),
    ]
})
export class GraphQlModule {}