import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { Policy } from './schema/policy.schema';
export declare class PolicyController {
    private policyService;
    constructor(policyService: PolicyService);
    create(createPolicyDto: CreatePolicyDto): Promise<Policy>;
    findAll(): Promise<Policy[]>;
    update(id: string, updateFineDto: CreatePolicyDto): Promise<Policy>;
    remove(id: string): Promise<Policy>;
}
