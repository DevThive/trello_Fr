import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigProjectModule } from "./config/config.module";
import { TypeormModule } from "./typeorm/typeorm.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BoardModule } from "./board/board.module";
import { CommentModule } from "./comment/comment.module";
import { ColumnModule } from "./column/column.module";
import { CardModule } from "./card/card.module";

@Module({
    imports: [
        ConfigProjectModule,
        TypeormModule.forRoot(),
        AuthModule,
        UserModule,
        BoardModule,
        CommentModule,
        ColumnModule,
        CardModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}