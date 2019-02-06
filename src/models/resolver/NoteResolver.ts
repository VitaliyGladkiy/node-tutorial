import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {NoteService} from "../service/NoteService";
import {Note, NoteType} from "../../entity/Note";
import {TaskType} from "../../entity/Task";
import {NoteStatus} from "../../types/NoteStatus";

@Resolver()
export class NoteResolver {

    constructor(
        private readonly noteService: NoteService,
    ) {}

    @Mutation(() => Number)
    async addNote(
        @Arg('theme') theme: string,
        @Arg('text') text: string,
        @Arg('type') type: NoteType
    ): Promise<number>{
        return await this.noteService.addNote(theme, text, type)
    }

    @Query(()=>[Note])
    async getAll(): Promise<Note[]> {
        return await this.noteService.getAll();
    }

    @Mutation(() => Boolean)
    async deleteById(@Arg('id') id: string): Promise<boolean> {
        return await this.noteService.deleteById(id)
    }

    @Mutation(() => Boolean)
    async addNewTask(
        @Arg('name') name: string, @Arg('taskType') taskType: TaskType
    ): Promise<boolean> {
        await this.noteService.saveTask(name, taskType);
        return true
    }

    @Mutation(()=> Boolean)
    async editText(@Arg('id') id: number, @Arg('text') text: string): Promise<boolean> {
        await this.noteService.editText(id, text);
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