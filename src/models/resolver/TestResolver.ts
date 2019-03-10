import {Arg, Query, Resolver} from "type-graphql";
import {NoteService} from "../service/NoteService";
import {Note, NoteType} from "../../entity/Note";
import {Mutation} from "type-graphql";

@Resolver()
export class TestResolver {

    constructor(private readonly noteService: NoteService) {}
    @Query(() => String)
    async hello(): Promise<String> {
        console.log('hello');
        return 'hellofrom api'
    }

    @Query(() => [Note])
    async testGetAll(): Promise<Note[]> {
        return await this.noteService.getAll(8);
    }

    @Mutation(() => Number)
    async testAddNote(
        @Arg('theme') theme: string,
        @Arg('text') text: string,
        @Arg('type') type: NoteType,
    ): Promise<number> {
        await this.noteService.addNote(theme, text, type, 8);
        return 1;
    }

    @Mutation(() => Number)
    async updateNote(
        @Arg('id') id: string,
        @Arg('theme') theme: string,
        @Arg('text') text: string,
        @Arg('type') type: NoteType,
    ): Promise<number> {
        await this.noteService.updateNote(id, theme, text, type);
        return 1;
    }
}
