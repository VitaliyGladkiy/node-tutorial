import {Service} from 'typedi'
import {Note, NoteType} from "../../entity/Note";
import {getRepository} from "typeorm";
import {Task, TaskType} from "../../entity/Task";
import {NoteStatus} from "../../types/NoteStatus";

@Service()
export class NoteService {
    constructor(
    private noteReposiry = getRepository('Note'),
    private taskRepository = getRepository('Task')
){}
    public async addNote(theme: string, text: string, type: NoteType): Promise<number>{
        const note = new Note();
        note.theme = theme;
        note.text = text;
        note.link = '1';
        note.author = '1';
        note.type = type;
        note.createDate = new Date();
        await this.noteReposiry.save(note);
        return 1
    }

    public async getAll(): Promise<Note[]> {
        return await this.noteReposiry.find({}) as Note[];
    }

    public async deleteById(id: string) {
        const res = await this.noteReposiry.delete(id);
        console.log(res);
        return true;
    }

    async saveTask(name: string, taskType: TaskType) {
        let task = new Task();
        task.name = name;
        task.type = taskType;
        await this.taskRepository.save(task);
    }

    async editText(id: number, text: string){
        await this.noteReposiry.update(id, {text: text});
    }

    public async setStatus(id: number, newStatus: NoteStatus) {
        await this.noteReposiry.update(id, {status: newStatus})
    }

    public async changeNoteType(id: number, newType: NoteType) {
        await this.noteReposiry.update(id, {type: newType})
    }
}