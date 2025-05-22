/* eslint-env jest */
const httpMocks = require('node-mocks-http');
const attachSessionFlag = require('../server/middlewares/responseWrapper');

describe('attachSessionFlag middleware', () => {
    it('should append isActiveSession to JSON response if defined', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        req.isActiveSession = true;

        const jsonSpy = jest.spyOn(res, 'json');

        attachSessionFlag(req, res, next);

        res.json({ message: 'Hello' });

        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Hello',
            isActiveSession: true,
        });

        expect(next).toHaveBeenCalled();
    });


    it('should not append isActiveSession if undefined', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const jsonSpy = jest.spyOn(res, 'json');

        attachSessionFlag(req, res, next);

        res.json({ message: 'Hello' });

        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Hello',
        });

        expect(next).toHaveBeenCalled();
    });

});
