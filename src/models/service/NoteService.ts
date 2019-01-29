import {Service} from 'typedi'
import {Note} from "../../entity/Note";
import {getRepository} from "typeorm";

@Service()
export class NoteService {
    constructor(
    private noteReposiry = getRepository('Note'),
){}
    public async addNote(theme: string, payload: string): Promise<number>{
        const note = new Note();
        note.theme = theme;
        note.payload = payload;
        note.link = '1';
        note.author = '2';
        note.createDate = 'date';
        const res = await this.noteReposiry.save(note);
        console.log('save result: ', res);
        return 1
    }

    public async getAll(): Promise<Note[]> {
        const res =  await this.noteReposiry.find({}) as Note[];
        console.log('find res: ', res);
        return res;
    }

    // public async getOneById(id: number): Promise<Note> {
    //
    // }
}