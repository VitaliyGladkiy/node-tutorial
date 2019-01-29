import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {NoteService} from "../service/NoteService";
import {Note} from "../../entity/Note";

@Resolver()
export class NoteResolver {

    constructor(
        private readonly noteService: NoteService,
    ) {}

    @Mutation(() => Number)
    async addNote(@Arg('theme') theme: string, @Arg('payload') payload: string): Promise<number>{
        console.log('try to write');
        return await this.noteService.addNote(theme, payload)
    }

    @Query(()=>[Note])
    async getAll(): Promise<Note[]> {
        return await this.noteService.getAll();
    }
}