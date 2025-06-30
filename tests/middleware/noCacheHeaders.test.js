const { noCacheHeaders } = require('../../server/middlewares/noCacheHeaders');

describe('noCacheHeaders middleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            setHeader: jest.fn()
        };
        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set Cache-Control header correctly', () => {
        noCacheHeaders(mockReq, mockRes, mockNext);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
            'Cache-Control',
            'no-store, no-cache, must-revalidate, proxy-revalidate'
        );
    });

    it('should set Pragma header correctly', () => {
        noCacheHeaders(mockReq, mockRes, mockNext);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
            'Pragma',
            'no-cache'
        );
    });

    it('should set Expires header correctly', () => {
        noCacheHeaders(mockReq, mockRes, mockNext);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
            'Expires',
            '0'
        );
    });

    it('should set Surrogate-Control header correctly', () => {
        noCacheHeaders(mockReq, mockRes, mockNext);

        expect(mockRes.setHeader).toHaveBeenCalledWith(
            'Surrogate-Control',
            'no-store'
        );
    });

    it('should call next() function', () => {
        noCacheHeaders(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    it('should set all headers in the correct order', () => {
        noCacheHeaders(mockReq, mockRes, mockNext);

        const calls = mockRes.setHeader.mock.calls;

        expect(calls[0][0]).toBe('Cache-Control');
        expect(calls[1][0]).toBe('Pragma');
        expect(calls[2][0]).toBe('Expires');
        expect(calls[3][0]).toBe('Surrogate-Control');
    });
});