import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsOptional()
    @ApiProperty()
    status : ToDoStatus
}

enum ToDoStatus{
    ACTIVE = 'ACTIVE',
    DONE = 'DONE'
}