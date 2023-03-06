import { ApiProperty } from "@nestjs/swagger";

export class CreateJobDto {
    @ApiProperty({ type: 'string', format: 'binary', nullable: true , required : false})
    plan: Express.Multer.File;
    @ApiProperty()
    site_name : string
    @ApiProperty()
    reference : string
    @ApiProperty()
    operateur : string
    @ApiProperty()
    adress : string
    @ApiProperty()
    contact_client : string
    @ApiProperty()
    site_raccorde : boolean
    @ApiProperty()
    chambre : string
    @ApiProperty()
    bpe : string
    @ApiProperty()
    four_fo : boolean
    @ApiProperty()
    thirty_fo : boolean
    @ApiProperty()
    devis_av : boolean
    @ApiProperty()
    add_info : string
}
