import { OpenApiValidator } from 'express-openapi-validate';
import * as fs from 'fs';
import * as path from 'path';

export default class OASValidator {
  public static validateRoute() {
    const oasFile = path.join(__dirname, '../oas.json');
    const oas = fs.readFileSync(oasFile, 'utf-8');
    const oasObject = JSON.parse(oas);
    return new OpenApiValidator(oasObject);
  }
}
