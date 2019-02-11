import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {NoteService} from "../service/NoteService";
import {Note, NoteType} from "../../entity/Note";
import {NoteStatus} from "../../types/NoteStatus";
import {UserService} from "../service/UserService";

@Resolver()
export class NoteResolver {

    constructor(
        private readonly noteService: NoteService,
        private readonly userService: UserService
    ) {}

    @Mutation(() => Number)
    async addNote(
        @Arg('theme') theme: string,
        @Arg('text') text: string,
        @Arg('type') type: NoteType,
        @Arg('token') token: string,
    ): Promise<number>{
        const id = this.userService.decodeToken(token);
        return await this.noteService.addNote(theme, text, type, id)
    }

    @Query(()=>[Note])
    async getAll(@Arg('token') token: string): Promise<Note[]> {
        const id = this.userService.decodeToken(token);
        return await this.noteService.getAll(id);
    }

    @Mutation(() => Boolean)
    async deleteById(@Arg('id') id: number): Promise<boolean> {
        return await this.noteService.deleteById(id)
    }

    @Mutation(()=> Boolean)
    async editText(@Arg('id') id: number, @Arg('text') text: string): Promise<boolean> {
        await this.noteService.editText(id, text);
        return true
    }

    @Mutation(() => Boolean)
    async editTheme(@Arg('id') id: number, @Arg('theme') theme: string): Promise<boolean> {
        await this.noteService.editTheme(id, theme);
        return true
    }
    @Mutation(() => Boolean)
    async setStatus(@Arg('id') id: number, @Arg('status') status: NoteStatus): Promise<boolean> {
        await this.noteService.setStatus(id, status);
        return true;
    }

    @Mutation(() => Boolean)
    async changeNoteType(@Arg('id') id: number, @Arg('type') type: NoteType): Promise<boolean> {
        await this.noteService.changeNoteType(id, type);
        return true;
    }

    @Query(() => [String])
    async getTypeList(): Promise<string[]> {
        return Object.keys(NoteType);
    }

    @Query(() => [String])
    async getStatusList(): Promise<string[]> {
        return Object.keys(NoteStatus);
    }
}