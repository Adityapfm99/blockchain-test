import { ApiProperty } from "@nestjs/swagger";


  
  export class jsonFromLineDto {
    @ApiProperty()
    timestamp: number;

    @ApiProperty()
    transaction_type: string;

    @ApiProperty({
        example: "jakarta",
    })
    token: string;

    @ApiProperty({
        example: "2001-01-01",
    })
    amount: number;
  
  }

  
  