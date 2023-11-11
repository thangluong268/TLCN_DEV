import { CreateFineDto } from './dto/create-fine.dto';
import { Fine } from './schema/fine.shema';
import { Model } from 'mongoose';
export declare class FineService {
    private readonly fineModel;
    constructor(fineModel: Model<Fine>);
    create(createFineDto: CreateFineDto): Promise<Fine>;
    findAll(): Promise<Fine[]>;
    update(id: string, updateFineDto: CreateFineDto): Promise<Fine>;
    remove(id: string): Promise<Fine>;
}
