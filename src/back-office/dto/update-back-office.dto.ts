import { PartialType } from '@nestjs/swagger';
import { CreateBackOfficeDto } from './create-back-office.dto';

export class UpdateBackOfficeDto extends PartialType(CreateBackOfficeDto) {}
