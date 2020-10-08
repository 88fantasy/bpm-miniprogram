import { wxRequest } from '../utils/request';
const operate = (url, options, other) => {
    const app = getApp();
    const { token } = app.globalData.accountInfo;
    if (!options.token) {
        options.token = token;
    }
    return wxRequest({
        url,
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        ...other,
        data: {
            ...options,
        }
    }, false);
};
export const approve = (options, other) => {
    return operate('/ass/approve', options, other);
};
export const reject = (options, other) => {
    return operate('/ass/reject', options, other);
};
export const stop = (options, other) => {
    return operate('/ass/stop', options, other);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXNzYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTyxrQkFBa0IsQ0FBQztBQUU5QyxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQVcsRUFBRSxPQUF1QixFQUFFLEtBQVcsRUFBRSxFQUFFO0lBQ3BFLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYSxDQUFDO0lBQ2hDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUM5QyxJQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtRQUNqQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUN2QjtJQUNELE9BQU8sU0FBUyxDQUFDO1FBQ2YsR0FBRztRQUNILE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTSxFQUFHO1lBQ1AsY0FBYyxFQUFHLG1DQUFtQztTQUNyRDtRQUNELEdBQUcsS0FBSztRQUNSLElBQUksRUFBRTtZQUNKLEdBQUcsT0FBTztTQUNYO0tBQ0YsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQXVCLEVBQUUsS0FBVyxFQUFFLEVBQUU7SUFDOUQsT0FBTyxPQUFPLENBQUMsY0FBYyxFQUFDLE9BQU8sRUFBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFzQixFQUFFLEtBQVcsRUFBRSxFQUFFO0lBQzVELE9BQU8sT0FBTyxDQUFDLGFBQWEsRUFBQyxPQUFPLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsT0FBb0IsRUFBRSxLQUFXLEVBQUUsRUFBRTtJQUN4RCxPQUFPLE9BQU8sQ0FBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHd4UmVxdWVzdCB9ICBmcm9tICcuLi91dGlscy9yZXF1ZXN0JztcblxuY29uc3Qgb3BlcmF0ZSA9ICh1cmw6IHN0cmluZywgb3B0aW9uczogQXBwcm92ZVJlcXVlc3QsIG90aGVyPzogYW55KSA9PiB7XG4gIGNvbnN0IGFwcCA9IGdldEFwcDxCcG1PcHRpb24+KCk7XG4gIGNvbnN0IHsgdG9rZW4gfSAgPSBhcHAuZ2xvYmFsRGF0YS5hY2NvdW50SW5mbzsgXG4gIGlmKCFvcHRpb25zLnRva2VuKSB7XG4gICAgb3B0aW9ucy50b2tlbiA9IHRva2VuO1xuICB9XG4gIHJldHVybiB3eFJlcXVlc3Qoe1xuICAgIHVybCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXIgOiB7XG4gICAgICAnY29udGVudC10eXBlJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgIH0sXG4gICAgLi4ub3RoZXIsXG4gICAgZGF0YToge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9XG4gIH0sIGZhbHNlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFwcHJvdmUgPSAob3B0aW9uczogQXBwcm92ZVJlcXVlc3QsIG90aGVyPzogYW55KSA9PiB7XG4gIHJldHVybiBvcGVyYXRlKCcvYXNzL2FwcHJvdmUnLG9wdGlvbnMsb3RoZXIpO1xufVxuXG5leHBvcnQgY29uc3QgcmVqZWN0ID0gKG9wdGlvbnM6IFJlamVjdFJlcXVlc3QsIG90aGVyPzogYW55KSA9PiB7XG4gIHJldHVybiBvcGVyYXRlKCcvYXNzL3JlamVjdCcsb3B0aW9ucyxvdGhlcik7XG59XG5cbmV4cG9ydCBjb25zdCBzdG9wID0gKG9wdGlvbnM6IFN0b3BSZXF1ZXN0LCBvdGhlcj86IGFueSkgPT4ge1xuICByZXR1cm4gb3BlcmF0ZSgnL2Fzcy9zdG9wJyxvcHRpb25zLG90aGVyKTtcbn0iXX0=