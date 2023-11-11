import * as mongoose from 'mongoose';
import { Policy } from './schema/policy.schema';
import { CreatePolicyDto } from './dto/create-policy.dto';
export declare class PolicyService {
    private readonly policyModel;
    constructor(policyModel: mongoose.Model<Policy>);
    create(createPolicyDto: CreatePolicyDto): Promise<Policy>;
    findAll(): Promise<Policy[]>;
    update(id: string, updateFineDto: CreatePolicyDto): Promise<Policy>;
    remove(id: string): Promise<Policy>;
}
