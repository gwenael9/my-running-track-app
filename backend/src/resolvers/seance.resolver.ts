import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Seance, { InputCreateSeance, InputUpdateSeance } from "../entities/seance.entity";
import SeanceService from "../services/seance.service";
import { GraphQLError } from "graphql";

@Resolver((of) => Seance)
export default class SeanceResolver {

    @Query(() => [Seance])
    async seances() {
        return await new SeanceService().listSeance();
    }

    @Mutation(() => Seance)
    async createSeance(@Arg("infos") infos: InputCreateSeance) {
        return await new SeanceService().createSeance(infos);
    }

    @Mutation(() => Seance)
    async updateSeance(
        @Arg("seanceId") id: string,
        @Arg("infos", { validate: true }) infos: InputUpdateSeance
    ) {
        return await new SeanceService().updateSeance(id, infos);
    }

    @Mutation(() => String)
    async deleteSeance(@Arg("seanceId") id: string) {
        await new SeanceService().deleteSeance(id);
        return "delete";
    }
}
