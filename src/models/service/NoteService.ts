import {Service} from 'typedi'
import {Note, NoteType} from "../../entity/Note";
import {getRepository} from "typeorm";
import {NoteStatus} from "../../types/NoteStatus";
import {User} from "../../entity/User";
import {Profile} from "../../entity/Profile";
// import {Profile} from "../../entity/Profile";
// import {User} from "../../entity/User";

@Service()
export class NoteService {
    constructor(
    private noteRepository = getRepository('Note'),
    private userRepository = getRepository('User'),
    private profileRepository = getRepository('Profile')
){}
    public async addNote(theme: string, text: string, type: NoteType, userId: number): Promise<number>{
        // @ts-ignore
        const user: User[] = await this.userRepository.find({where:{id: userId}, relations: ["profile"]});
        console.log('get user: ', user[0]);
        const note = new Note();
        note.theme = theme;
        note.text = text;
        note.link = '1';
        note.author = '1';
        note.type = type;
        note.createDate = new Date();
        note.profile = user[0].profile;
        await this.noteRepository.save(note);
        // @ts-ignore
        const profile: Profile[] = await this.profileRepository.find({where:{id: user[0].profile.id}, relations:["noteList"]});
        console.log('profile', profile[0]);
        profile[0].noteList.push(note);
        await this.profileRepository.save(profile[0]);
        return 1
    }

    public async getAll(userid: number): Promise<Note[]> {

        // @ts-ignore
        const user: User[] = await this.userRepository.find({where: {id: userid}, relations: ["profile"]});
        // @ts-ignore
        const noteList: Note[] = await this.noteRepository.find({where: {profile: 6}});
        return noteList
    }

    public async deleteById(id: number) {
        // const user = await this.userRepository.findOne(userId) as User;
        //
        // const profile = await  this.profileRepository.find({where: {id: user.profile.id}, relations: ["note"]}) as Profile;

        await this.noteRepository.delete(id);
        const res = await this.noteRepository.delete(id);
        console.log(res);
        return true;
    }

    async editText(id: number, text: string){
        await this.noteRepository.update(id, {text: text});
    }

    async editTheme(id: number, theme: string) {
        await this.noteRepository.update(id, {theme: theme});
    }

    public async setStatus(id: number, newStatus: NoteStatus) {
        await this.noteRepository.update(id, {status: newStatus})
    }

    public async changeNoteType(id: number, newType: NoteType) {
        await this.noteRepository.update(id, {type: newType})
    }
}