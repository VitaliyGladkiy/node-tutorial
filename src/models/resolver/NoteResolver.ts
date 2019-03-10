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
        await this.noteService.addNote(theme, text, type, id);
        return 1;
    }

    @Query(()=>[Note])
    async getAll(@Arg('token') token: string): Promise<Note[]> {
        const id = this.userService.decodeToken(token);
        return await this.noteService.getAll(id);
    }

    @Query(()=>[Note])
    async testGetAll(): Promise<Note[]> {
        console.log('try tp find all');
        return await this.noteService.getAll(8);
    }

    @Mutation(() => Boolean)
    async deleteById(@Arg('id') id: string): Promise<boolean> {
        const d = Number(id);
        await this.noteService.deleteById(d);
        return true
    }

    @Mutation(()=> Boolean)
    async editText(@Arg('id') id: number, @Arg('text') text: string): Promise<boolean> {
        await this.noteService.editText(id, text);
        return true
    }

    @Query(() => Note)
    async getOne(@Arg('id') id: number): Promise<Note> {
        return await this.noteService.getOne(id)
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
        console.log('get note type');
        return Object.keys(NoteType);
    }

    @Query(() => [String])
    async getStatusList(): Promise<string[]> {
        return Object.keys(NoteStatus);
    }
}
