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

    @Mutation(() => Number)
    async editText(@Arg('id') id: number, @Arg('text') text: string): Promise<number> {
        return await this.noteService.editText(id, text);
    }

    @Mutation(() => Number)
    async setStatus(@Arg('id') id: number, @Arg('status') status: NoteStatus): Promise<number> {
        // await this.noteService.setStatus(id, status);
        console.log(id, status);
        return 1
    }

    @Mutation(() => Number)
    async changeNoteType(@Arg('id') id: number, @Arg('type') type: NoteType): Promise<number> {
        // return await this.noteService.changeStatus(id, type);
        console.log(id, type);
        return 1
    }

}