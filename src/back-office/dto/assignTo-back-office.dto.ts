import { ApiProperty } from "@nestjs/swagger"

export class AssignToBackOfficeDto {
    @ApiProperty()
    jobId : string
    @ApiProperty({ isArray: true, type: String })
    assignTo: [string]
}
