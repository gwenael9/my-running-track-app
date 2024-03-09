import { GraphQLError } from 'graphql';
import { Repository } from "typeorm";
import Seance, {
  InputCreateSeance,
  InputUpdateSeance,
} from "../entities/seance.entity";
import datasource from "../lib/datasource";

export default class SeanceService {
  db: Repository<Seance>;
  constructor() {
    this.db = datasource.getRepository(Seance);
  }

  async listSeance() {
    return this.db.find();
  }

  async createSeance({ distance, duree, ressenti, date }: InputCreateSeance) {
    const newSeance = this.db.create({
      distance,
      duree,
      ressenti,
      date,
    });
    return await this.db.save(newSeance);
  }

  async updateSeance(
    id: string,
    { distance, duree, ressenti, date }: InputUpdateSeance
  ) {
    const seanceToUpdate = await this.db.findOneBy({ id });
    if (!seanceToUpdate) {
      throw new GraphQLError("introuvable");
    }

    // Mettez à jour les propriétés si elles sont définies
    seanceToUpdate.distance = distance ?? seanceToUpdate.distance;
    seanceToUpdate.duree = duree ?? seanceToUpdate.duree;
    seanceToUpdate.ressenti = ressenti ?? seanceToUpdate.ressenti;
    seanceToUpdate.date = date ?? seanceToUpdate.date;

    // Enregistrez la séance mise à jour
    return await this.db.save(seanceToUpdate);
  }

  async deleteSeance(id: string) {
    const seance = await Seance.findOne({ where: { id }});
    if (!seance) throw new GraphQLError("introuvable");

    return await this.db.remove(seance);
  }
}
