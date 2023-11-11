import { FineService } from './fine.service';
import { CreateFineDto } from './dto/create-fine.dto';
import { Fine } from './schema/fine.shema';
export declare class FineController {
    private readonly fineService;
    constructor(fineService: FineService);
    create(createFineDto: CreateFineDto): Promise<Fine>;
    findAll(): Promise<Fine[]>;
    update(id: string, updateFineDto: CreateFineDto): Promise<Fine>;
    remove(id: string): Promise<Fine>;
}
